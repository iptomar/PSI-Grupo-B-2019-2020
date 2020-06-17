/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Tomás Barros
 */
public class CreateRoteiros {

    WebDriver driver;

    public CreateRoteiros(WebDriver driver) {
        this.driver = driver;
    }

    public void AddRoteiros() {
        try {
            //Ir para create authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Criar Roteiros']")).click();
            Thread.sleep(2000);
            WebElement nomerota = driver.findElement(By.className("form-control"));
            nomerota.sendKeys("AaRota");
            Thread.sleep(2000);
            //Erro às vezes
            WebElement teste = driver.findElement(By.id("react-select-2-input"));
            teste.sendKeys("aa");
            Thread.sleep(6000);
            teste.sendKeys(Keys.RETURN);
            
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(1000);
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("Routes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
