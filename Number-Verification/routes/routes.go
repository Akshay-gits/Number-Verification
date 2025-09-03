package routes

import (
	"github.com/Akshay-gits/Number-Verification/controllers"
	"github.com/Akshay-gits/Number-Verification/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	r.POST("/auth/register", controllers.Register)
	r.POST("/auth/login", controllers.Login)

	r.POST("/api/armstrong/verify", middleware.AuthMiddleware(""), controllers.VerifyArmstrong)
	r.GET("/api/armstrong/numbers", middleware.AuthMiddleware(""), controllers.GetUserArmstrongNumbers)

	r.GET("/api/admin/users", middleware.AuthMiddleware("admin"), controllers.GetAllUsers)
	r.GET("/api/admin/search", middleware.AuthMiddleware("admin"), controllers.SearchUsersAndNumbers)
}
