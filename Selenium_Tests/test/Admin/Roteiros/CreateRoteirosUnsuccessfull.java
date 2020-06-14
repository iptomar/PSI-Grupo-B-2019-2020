/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import java.security.Key;
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
            WebElement nomerota = driver.findElement(By.className("form-control"));
            nomerota.sendKeys("");
            Thread.sleep(5000);
            WebElement nomeponto = driver.findElement(By.id("react-select-2-input"));
            nomeponto.sendKeys("");
            nomeponto.sendKeys(Keys.RETURN);
      Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
           
            Thread.sleep(2000);
             driver.switchTo().alert().accept();
            String title = driver.getCurrentUrl();
            Thread.sleep(5000);
            if(title.contains("CreateRoutes")){
                 System.out.println("Roteiro não criado");
             }else{
                 throw new Exception("Roteiro criado com sucesso");
             }
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
