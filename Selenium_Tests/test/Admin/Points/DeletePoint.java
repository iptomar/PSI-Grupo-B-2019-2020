/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Points;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 *
 * @author Tomás Barros
 */
public class DeletePoint {
    WebDriver driver;
    
    public DeletePoint(WebDriver driver) {
        this.driver = driver;
    }
    
    public void DelPoint() {
        try {
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
              //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("PointsOfInterest"));
        } catch (InterruptedException ex) {
            Logger.getLogger(DeletePoint.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
