/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Users;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
//comment the above line and uncomment below line to use Chrome

/**
 *
 * @author Luís Badalo
 */
public class UserAuthors {

    WebDriver driver;

    public UserAuthors(WebDriver driver) {
        this.driver = driver;
    }

    public void UserListAuthors() {
        try {
            //Ir para create authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Autores']")).click();
            Thread.sleep(3000);
            //Confirmação
            String title = driver.getCurrentUrl();
            System.out.println(title);
            Assert.assertEquals(true, title.contains("Authors"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
