/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin;

import Admin.Authors.CreateAuthors;
import Admin.Authors.CreateAuthorsUnsuccessfull;
import Admin.Authors.DeleteAuthors;
import Admin.Authors.DetailsAuthors;
import Admin.Authors.EditAuthors;
import Admin.Authors.EditAuthorsUnsuccessfull;
import Admin.Points.CreatePoint;
import Admin.Points.CreatePointUnsuccessfull;
import Admin.Points.EditPointUnsuccessfull;
import Admin.Roteiros.CreateRoteirosUnsuccessfull;
import Admin.Roteiros.EditRoteirosUnsuccessfull;
import Admin.Users.EditUsers;
import Admin.Users.EditUsersUnsuccessfull;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 *
 * @author Antonio Rodrigues
 */
public class test {
    public static void main(String[] args) {
            System.setProperty("webdriver.gecko.driver","C:\\selenium-java-3.141.59\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
               LoginSuccess log = new LoginSuccess(driver);
                driver.get("http://front.psi2020.tugamars.com/login2");
                log.loginSucessfully();
                EditUsers CA = new EditUsers(driver);
                //driver.get("http://front.psi2020.tugamars.com/CreateAuthors");
                
                CA.EditedUsers();
              //  driver.close();
    }
}
