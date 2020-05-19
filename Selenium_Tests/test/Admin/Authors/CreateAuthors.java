/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Authors;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
//comment the above line and uncomment below line to use Chrome
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Tomás Barros
 */
public class CreateAuthors {
    WebDriver driver;
    
    public CreateAuthors(WebDriver driver) {
        this.driver = driver;
    }
 public void AddAuthors() {
        try {
            //Ir para create authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Create Authors']")).click();
            Thread.sleep(500);
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("SeleniumTest1");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
             //ARRANJAR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("home"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
