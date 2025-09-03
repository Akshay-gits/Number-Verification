package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	UserID           uint              `gorm:"primaryKey" json:"user_id"`
	Email            string            `gorm:"uniqueIndex;not null" json:"email"`
	Password         string            `json:"-"`
	Username         string            `gorm:"not null" json:"username"`
	Role             string            `gorm:"default:user" json:"role"`
	CreatedAt        time.Time         `json:"created_at"`
	UpdatedAt        time.Time         `json:"updated_at"`
	DeletedAt        gorm.DeletedAt    `gorm:"index" json:"-"`
	ArmstrongNumbers []ArmstrongNumber `gorm:"foreignKey:UserID"`
}
