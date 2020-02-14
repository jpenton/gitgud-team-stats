package gitgud

import (
	"crypto/sha256"
	"errors"
	"fmt"
	"log"
	"strings"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/fauna/faunadb-go/faunadb"
	jsoniter "github.com/json-iterator/go"
	"github.com/levigross/grequests"
)

// Team is a representation of the team on their division's spreadsheet
type Team struct {
	Division string `fauna:"division"`
	Hash     string `fauna:"hash"`
	ID       string `fauna:"_id"`
	Name     string `fauna:"name"`
	Region   string `fauna:"region"`
}

// Player holds data about a player
type Player struct {
	Bnet    string `fauna:"bnet"`
	Discord string `fauna:"discord"`
	Hash    string `fauna:"hash"`
	ID      string `fauna:"_id"`
}

var json = jsoniter.ConfigCompatibleWithStandardLibrary

// Divisions contains all of the divisions
var Divisions = []string{"Beginner", "Rookie", "Intermediate", "Advanced", "Expert"}

// Regions contains all of the regions
var Regions = []string{"NA", "EU"}

// RegionSheet provides the sheet download link for a specific region
var RegionSheet = map[string]string{
	"NA": "https://docs.google.com/spreadsheets/d/1thBX-kW8hsnNxwX3hZLFY-rM3ApKKwQ2sOfb8fv9XIU/export?format=xlsx&id=1thBX-kW8hsnNxwX3hZLFY-rM3ApKKwQ2sOfb8fv9XIU",
	"EU": "https://docs.google.com/spreadsheets/d/1OpTkYElIX7uY-QCvrcfiGknjL3p2ujTc6nTe5M_QsY0/export?format=xlsx&id=1OpTkYElIX7uY-QCvrcfiGknjL3p2ujTc6nTe5M_QsY0",
}

func generateSHA256Hash(v interface{}) (string, error) {
	data, err := json.Marshal(v)

	if err != nil {
		return "", err
	}

	hash := sha256.Sum256(data)
	hashString := fmt.Sprintf("%x", hash)

	return hashString, nil
}

func isPlayerInPlayers(hash string, players []Player) bool {
	for _, player := range players {
		playerHash, err := generateSHA256Hash(Player{
			Bnet:    player.Bnet,
			Discord: player.Discord,
		})

		if err != nil {
			log.Println(err.Error())
			continue
		}

		if playerHash == hash {
			return true
		}
	}

	return false
}

// CreatePlayer creates a player in the FaunaDB database
func CreatePlayer(client *faunadb.FaunaClient, player *Player) (string, error) {
	if player.Bnet == "" {
		return "", errors.New("A pointer to a Player must be passed to CreatePlayer()")
	}

	res, err := client.Query(
		faunadb.Create(
			faunadb.Class("Player"),
			faunadb.Obj{
				"data": faunadb.Obj{
					"bnet":    player.Bnet,
					"discord": player.Discord,
					"hash":    player.Hash,
				},
			},
		),
	)

	if err != nil {
		return "", err
	}

	var refVal faunadb.RefV
	err = res.At(faunadb.ObjKey("ref")).Get(&refVal)

	if err != nil {
		return "", err
	}

	return refVal.ID, nil
}

// CreateTeam creates a player in the FaunaDB database
func CreateTeam(client *faunadb.FaunaClient, team *Team) (string, error) {
	if team.Division == "" {
		return "", errors.New("A pointer to a Team must be passed to CreateTeam()")
	}

	res, err := client.Query(
		faunadb.Create(
			faunadb.Class("Team"),
			faunadb.Obj{
				"data": faunadb.Obj{
					"division": team.Division,
					"hash":     team.Hash,
					"name":     team.Name,
					"region":   team.Region,
				},
			},
		),
	)

	if err != nil {
		return "", err
	}

	var refVal faunadb.RefV
	err = res.At(faunadb.ObjKey("ref")).Get(&refVal)

	if err != nil {
		return "", err
	}

	return refVal.ID, nil
}

// GetPlayer retrieves a player from the FaunaDB database
func GetPlayer(client *faunadb.FaunaClient, id, hash string) (Player, error) {
	if id == "" && hash == "" {
		return Player{}, errors.New("Either an id or hash must be passed to GetPlayer()")
	}

	var getRef interface{}

	if id != "" {
		getRef = faunadb.RefClass(
			faunadb.Class("Player"),
			id,
		)
	} else {
		// hash is valid
		getRef = faunadb.MatchTerm(
			faunadb.Index("unique_Player_hash"),
			hash,
		)
	}

	res, err := client.Query(
		faunadb.Get(
			getRef,
		),
	)

	if err != nil {
		return Player{}, err
	}

	var player Player

	err = res.At(faunadb.ObjKey("data")).Get(&player)

	if err != nil {
		return Player{}, err
	}

	var refVal faunadb.RefV
	err = res.At(faunadb.ObjKey("ref")).Get(&refVal)

	if err != nil {
		return Player{}, err
	}

	player.ID = refVal.ID

	return player, nil
}

// GetTeam retrieves a team from the FaunaDB database
func GetTeam(client *faunadb.FaunaClient, id, hash string) (Team, error) {
	if id == "" && hash == "" {
		return Team{}, errors.New("Either an id or hash must be passed to GetTeam()")
	}

	var getRef interface{}

	if id != "" {
		getRef = faunadb.RefClass(
			faunadb.Class("Team"),
			id,
		)
	} else {
		// hash is valid
		getRef = faunadb.MatchTerm(
			faunadb.Index("unique_Team_hash"),
			hash,
		)
	}

	res, err := client.Query(
		faunadb.Get(
			getRef,
		),
	)

	if err != nil {
		return Team{}, err
	}

	var team Team

	err = res.At(faunadb.ObjKey("data")).Get(&team)

	if err != nil {
		return Team{}, err
	}

	var refVal faunadb.RefV
	err = res.At(faunadb.ObjKey("ref")).Get(&refVal)

	if err != nil {
		return Team{}, err
	}

	team.ID = refVal.ID

	return team, nil
}

// LinkPlayerToTeam adds a ref to the player under team
func LinkPlayerToTeam(client *faunadb.FaunaClient, player *Player, team *Team) error {
	if player.ID == "" {
		return errors.New("Must pass a player to LinkPlayerToTeam()")
	} else if team.ID == "" {
		return errors.New("Must pass a team to LinkPlayerToTeam()")
	}

	_, err := client.Query(faunadb.Update(
		faunadb.RefClass(faunadb.Class("Player"), player.ID),
		faunadb.Obj{
			"data": faunadb.Obj{
				"team": faunadb.RefClass(faunadb.Class("Team"), team.ID),
			},
		},
	))

	return err
}

// ParseDivision parses a division in a region
func ParseDivision(client *faunadb.FaunaClient, file *excelize.File, region, division string) {
	log.Printf("Parsing region %v division %v...\n", region, division)

	rows := file.GetRows(division)

	for i := 2; i < len(rows); i += 5 {
		for i < len(rows) {
			row := &(rows[i])

			if (*row)[0] != "" {
				if strings.HasSuffix((*row)[0], "[F]") {
					i += 5 // skip team rows
					continue
				}

				break // parse team rows
			}

			i++
		}

		if i >= len(rows) {
			break
		}

		name := rows[i][0]
		team := Team{
			Division: division,
			Region:   region,
			Name:     name,
		}
		hash, err := generateSHA256Hash(team)

		if err != nil {
			log.Println(err.Error())
			continue
		}

		team.Hash = hash
		teamFromDB, err := GetTeam(client, "", team.Hash)

		if err != nil {
			id, err := CreateTeam(client, &team)

			if err != nil {
				log.Println(err.Error())
				continue
			}

			team.ID = id
		} else {
			team.ID = teamFromDB.ID
		}

		discords := rows[i+2]
		bnets := rows[i+3]
		var players []Player

		for index := range discords {
			if index == 0 || discords[index] == "" || bnets[index] == "" {
				continue
			}

			player := Player{
				Bnet:    strings.TrimSpace(bnets[index]),
				Discord: strings.TrimSpace(discords[index]),
			}
			hash, err := generateSHA256Hash(player)

			if err != nil {
				log.Println(err.Error())
				continue
			}

			if isPlayerInPlayers(hash, players) {
				continue
			}

			player.Hash = hash
			playerFromDB, err := GetPlayer(client, "", player.Hash)

			if err != nil {
				id, err := CreatePlayer(client, &player)

				if err != nil {
					log.Println(err.Error())
					continue
				}

				player.ID = id
			} else {
				player.ID = playerFromDB.ID
			}

			err = LinkPlayerToTeam(client, &player, &team)

			if err != nil {
				log.Println(err.Error())
				continue
			}

			players = append(players, player)
		}
	}
}

// ParseRegion parses a specific region
func ParseRegion(client *faunadb.FaunaClient, region string) error {
	log.Printf("Parsing region %v...\n", region)

	sheetURL := RegionSheet[region]

	if sheetURL == "" {
		return fmt.Errorf("Invalid region: %v", region)
	}

	resp, err := grequests.Get(sheetURL, nil)

	if err != nil {
		return err
	}

	file, err := excelize.OpenReader(resp)

	if err != nil {
		return err
	}

	log.Println("Parsing divisions...")

	for _, division := range Divisions {
		ParseDivision(client, file, region, division)

		break
	}

	return nil
}

// ParseRegions parses every region
func ParseRegions() error {
	log.Println("Parsing regions...")

	client := faunadb.NewFaunaClient("fnADkgZXzkACE8IQq887NN8Q8JHO-iHpZ9kvqjmi")

	for _, region := range Regions {
		err := ParseRegion(client, region)

		if err != nil {
			return err
		}

		break
	}

	return nil
}
