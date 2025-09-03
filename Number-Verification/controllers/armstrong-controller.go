package controllers

import (
	"net/http"

	"math"

	"github.com/Akshay-gits/Number-Verification/config"
	"github.com/Akshay-gits/Number-Verification/models"
	"github.com/gin-gonic/gin"
)

type ArmstrongInput struct {
	Number int `json:"number" binding:"required"`
}

// Check if number is Armstrong
func isArmstrong(n int) bool {
	numDigits := int(math.Log10(float64(n))) + 1
	sum, temp := 0, n

	for temp > 0 {
		digit := temp % 10
		sum += int(math.Pow(float64(digit), float64(numDigits)))
		temp /= 10
	}

	return sum == n
}

// Verify and store Armstrong number
func VerifyArmstrong(c *gin.Context) {
	var input ArmstrongInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Check positive
	if input.Number <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Number must be positive"})
		return
	}

	// Check Armstrong
	if !isArmstrong(input.Number) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not an Armstrong number"})
		return
	}

	// Save to DB
	armstrong := models.ArmstrongNumber{
		UserID: uint(userID.(uint)),
		Number: input.Number,
	}
	if err := config.DB.Create(&armstrong).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save number"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":   "Armstrong number saved successfully",
		"number":    input.Number,
		"user_id":   userID,
		"record_id": armstrong.ID,
	})
}
