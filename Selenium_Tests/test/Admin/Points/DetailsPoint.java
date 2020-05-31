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
public class DetailsPoint {
    WebDriver driver;
    
    public DetailsPoint(WebDriver driver) {
        this.driver = driver;
    }
    
    public void DetPoint() {
        try {
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Detalhes']")).click();
              //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("detalhes"));
        } catch (InterruptedException ex) {
            Logger.getLogger(DetailsPoint.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
