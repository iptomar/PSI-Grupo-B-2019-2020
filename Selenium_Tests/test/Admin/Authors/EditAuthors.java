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
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Tomás Barros
 */
public class EditAuthors {
    WebDriver driver;
    
    public EditAuthors(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void EditedAuthors() {
         try {
            //Ir para Authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Authors']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Edit']")).click();
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("SeleniumTest2");
            driver.findElement(By.xpath("//button[.='Submit']")).click();
             //ARRANJAR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("edit"));
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
