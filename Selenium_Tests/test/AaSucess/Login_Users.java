package AaSucess;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.RegisterSuccess;
import Admin.Users.*;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Login_Users {

    WebDriver driver;

    public Login_Users() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    //Ainda têm de dar fix nesta parte para se fazer os restos dos testes 
    public void UsersTest() {
        new RegisterSuccess(driver).registerSuccessfully();
        new LoginSuccess(driver).loginSucessfully();
        new ListUsers(driver).ListedUsers();
        new EditUsers(driver).EditedUsers();
        new EditUsersError(driver).EditedUsersErrors();
        new DeleteUsers(driver).DeletedUsers();
        driver.quit();
    }
}
