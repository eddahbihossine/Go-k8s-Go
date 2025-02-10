package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/machinebox/graphql"
)

const githubGraphQLURL = "https://api.github.com/graphql"

const query = `
{
	viewer {
		contributionsCollection {
			contributionCalendar {
				totalContributions
				weeks {
					contributionDays {
						contributionCount
						date
					}
				}
			}
		}
	}
}`

type ContributionDay struct {
	Date               string `json:"date"`
	ContributionCount  int    `json:"contributionCount"`
}

type ContributionWeek struct {
	ContributionDays []ContributionDay `json:"contributionDays"`
}

type ContributionCalendar struct {
	TotalContributions int               `json:"totalContributions"`
	Weeks              []ContributionWeek `json:"weeks"`
}

type ContributionsCollection struct {
	ContributionCalendar ContributionCalendar `json:"contributionCalendar"`
}

type Viewer struct {
	ContributionsCollection ContributionsCollection `json:"contributionsCollection"`
}

type GitHubResponse struct {
	Viewer Viewer `json:"viewer"`
}

func fetchContributions(w http.ResponseWriter, r *http.Request) {
	client := graphql.NewClient(githubGraphQLURL)
	req := graphql.NewRequest(query)

	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		http.Error(w, "Missing GitHub Token", http.StatusUnauthorized)
		return
	}
	req.Header.Set("Authorization", "Bearer "+token)

	var respData GitHubResponse
	if err := client.Run(r.Context(), req, &respData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert Data to JSON and Send Response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(respData)
}

func main() {
	// Create API Route
	http.HandleFunc("/contributions", fetchContributions)

	// Start Server
	port := ":8080"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
