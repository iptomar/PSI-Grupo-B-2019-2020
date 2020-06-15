/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.Roteiros.CreateRoteirosUnsuccessfull;
import Admin.Roteiros.EditRoteirosUnsuccessfull;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Uns_Login_Roteiros {

    WebDriver driver;

    public Uns_Login_Roteiros() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void RoteiroTest() {
        new LoginSuccess(driver).loginSucessfully();
        new CreateRoteirosUnsuccessfull(driver).AddRoteirosUnsuccessfull();
        new EditRoteirosUnsuccessfull(driver).EditedRoteirosUnsuccessfull();
        driver.quit();
    }
}
