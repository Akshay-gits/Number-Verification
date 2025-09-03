package models

import (
	"time"
)

type ArmstrongNumber struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	Number    int       `gorm:"not null" json:"number"`
	CreatedAt time.Time `json:"created_at"`
}
