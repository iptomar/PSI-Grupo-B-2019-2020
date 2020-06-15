/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.Authors.CreateAuthors;
import Admin.Authors.CreateAuthorsUnsuccessfull;
import Admin.Authors.DeleteAuthors;
import Admin.Authors.DetailsAuthors;
import Admin.Authors.EditAuthors;
import Admin.LoginSuccess;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Uns_Login_Authors {

    WebDriver driver;

    public Uns_Login_Authors() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void AuthorTest() {
        new LoginSuccess(driver).loginSucessfully();
        new CreateAuthorsUnsuccessfull(driver).AddAuthorsUnsuccessfull();
        driver.quit();
    }
}
