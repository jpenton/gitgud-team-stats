package main

import (
	"log"

	"github.com/jpenton/gitgud-team-stats/server/internal/gitgud"
)

func main() {
	err := gitgud.ParseRegions()

	log.Println(err)
}
