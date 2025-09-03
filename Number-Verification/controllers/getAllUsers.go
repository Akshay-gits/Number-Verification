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

func GetAllUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "5"))
	sort := c.DefaultQuery("sort", "asc")

	startDate := c.Query("start_date")
	endDate := c.Query("end_date")
	minNumber := c.Query("min_number")
	maxNumber := c.Query("max_number")
	hasNumbers := c.Query("has_numbers")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 5
	}

	offset := (page - 1) * limit
	orderClause := "armstrong_numbers.number asc"
	if sort == "desc" {
		orderClause = "armstrong_numbers.number desc"
	}

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
		return db.Order(orderClause)
	})

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

	if hasNumbers == "true" {
		db = db.Joins("JOIN armstrong_numbers ON armstrong_numbers.user_id = users.user_id").Group("users.user_id")
	} else if hasNumbers == "false" {
		db = db.Where("NOT EXISTS (SELECT 1 FROM armstrong_numbers WHERE armstrong_numbers.user_id = users.user_id)")
	}

	var users []models.User
	if err := db.Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
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
		"page":  page,
		"limit": limit,
		"sort":  sort,
		"users": response,
	})
}
