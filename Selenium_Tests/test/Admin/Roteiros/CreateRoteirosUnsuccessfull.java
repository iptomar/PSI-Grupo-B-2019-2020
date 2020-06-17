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
 * @author Antonio Rodrigues
 */
public class CreateRoteirosUnsuccessfull {

    WebDriver driver;

    public CreateRoteirosUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }

    public void AddRoteirosUnsuccessfull() {
        try {
            //Ir para create authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Criar Roteiros']")).click();
            Thread.sleep(5000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
            Thread.sleep(500);
            //Warnings na página(FORMA CORRETA)
            //WebElement classe = driver.findElement(By.className("alert-warning"));
            //Assert.assertEquals(true, classe.isDisplayed());

            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("CreateRoutes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
