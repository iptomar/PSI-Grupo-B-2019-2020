/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.RegisterSuccess;
import Admin.Users.DeleteUsers;
import Admin.Users.EditUsers;
import Admin.Users.EditUsersError;
import Testes.Login.Capabilities.Capabilities;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.jupiter.api.AfterEach;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class LoginMain {
    WebDriver driver;
    
    public LoginMain() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     @Test
     
    public void hello() {
    new LoginSuccess(driver).loginSucessfully();
    new DeleteUsers(driver).DeletedUsers();
    //new RegisterSuccess(driver).registerSuccessfully();
    //new RegisterUnsuccessfull(driver).registerUnsuccessfully();
    }
    @AfterEach
    public void quit(){
    driver.quit();
    }
}
