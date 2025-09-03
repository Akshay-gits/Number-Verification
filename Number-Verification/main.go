package main

import (
	"log"
	"os"

	"github.com/Akshay-gits/Number-Verification/config"
	"github.com/Akshay-gits/Number-Verification/models"
	"github.com/Akshay-gits/Number-Verification/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("Error loading the .env file")
	}

	db := config.ConnectDB()

	if err := db.AutoMigrate(&models.User{}, &models.ArmstrongNumber{}); err != nil {
		log.Fatal("Migration error :", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	routes.SetupRouter(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Server running on port " + port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
