package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Akshay-gits/Number-Verification/config"
	"github.com/Akshay-gits/Number-Verification/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SearchUsersAndNumbers(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
		return
	}

	startDate := c.Query("start_date")
	endDate := c.Query("end_date")
	minNumber := c.Query("min_number")
	maxNumber := c.Query("max_number")
	hasNumbers := c.Query("has_numbers")

	db := config.DB.Model(&models.User{}).Preload("ArmstrongNumbers", func(db *gorm.DB) *gorm.DB {
		if minNumber != "" {
			if min, err := strconv.Atoi(minNumber); err == nil {
				db = db.Where("armstrong_numbers.number >= ?", min)
			}
		}
		if maxNumber != "" {
			if max, err := strconv.Atoi(maxNumber); err == nil {
				db = db.Where("armstrong_numbers.number <= ?", max)
			}
		}
		return db
	}).Where("email ILIKE ? OR username ILIKE ?", "%"+query+"%", "%"+query+"%")

	// Date filter
	if startDate != "" {
		if t, err := time.Parse("2006-01-02", startDate); err == nil {
			db = db.Where("users.created_at >= ?", t)
		}
	}
	if endDate != "" {
		if t, err := time.Parse("2006-01-02", endDate); err == nil {
			db = db.Where("users.created_at <= ?", t)
		}
	}

	// Has Armstrong numbers filter
	if hasNumbers == "true" {
		db = db.Joins("JOIN armstrong_numbers ON armstrong_numbers.user_id = users.user_id").Group("users.user_id")
	} else if hasNumbers == "false" {
		db = db.Where("NOT EXISTS (SELECT 1 FROM armstrong_numbers WHERE armstrong_numbers.user_id = users.user_id)")
	}

	var users []models.User
	err := db.Find(&users).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := []gin.H{}
	for _, u := range users {
		response = append(response, gin.H{
			"user": gin.H{
				"user_id":    u.UserID,
				"email":      u.Email,
				"username":   u.Username,
				"role":       u.Role,
				"created_at": u.CreatedAt,
			},
			"numbers": u.ArmstrongNumbers,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"query": query,
		"users": response,
	})
}
