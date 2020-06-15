package AaUnsuccess;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.Points.CreatePointUnsuccessfull;
import Admin.Points.EditPointUnsuccessfull;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Uns_Login_Points {

    WebDriver driver;

    public Uns_Login_Points() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void PointsTest() {
        new LoginSuccess(driver).loginSucessfully();
        new CreatePointUnsuccessfull(driver).PointInterestUnsuccessfull();
        new EditPointUnsuccessfull(driver).EditPointUnsuccessfully();
        driver.quit();
    }
}
