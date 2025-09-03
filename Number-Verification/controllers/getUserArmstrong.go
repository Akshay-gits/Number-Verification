package controllers

import (
	"net/http"

	"github.com/Akshay-gits/Number-Verification/config"
	"github.com/Akshay-gits/Number-Verification/models"
	"github.com/gin-gonic/gin"
)

func GetUserArmstrongNumbers(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var numbers []models.ArmstrongNumber
	if err := config.DB.Where("user_id = ?", userID).Find(&numbers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch numbers"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"armstrong_numbers": numbers})
}
