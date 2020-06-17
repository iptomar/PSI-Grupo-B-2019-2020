/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Tomás Barros
 */
public class ApproveRoteiros {
    WebDriver driver;
    
    public ApproveRoteiros(WebDriver driver) {
        this.driver = driver;
    }
 public void ApprovedRoteiros() {
        try {
            //Ir para Authors
             Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
             Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Approve']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(1000);
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("Routes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
