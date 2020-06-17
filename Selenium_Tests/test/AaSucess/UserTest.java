package AaSucess;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Admin.LoginSuccess;
import Admin.RegisterSuccess;
import Testes.Login.Capabilities.Capabilities;
import Users.LoginSuccessUser;
import Users.UserAuthors;
import Users.UserPoints;
import Users.UserRoteiros;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class UserTest {

    WebDriver driver;

    public UserTest() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void UsersTest() {
        new LoginSuccess(driver).loginSucessfully();
        new RegisterSuccess(driver).registerSuccessfully();
        new LoginSuccessUser(driver).loginUserSucessfully();
        new UserAuthors(driver).UserListAuthors();
        new UserPoints(driver).UserListPoints();
        new UserRoteiros(driver).UserListRoteiros();
        driver.quit();
    }
}
