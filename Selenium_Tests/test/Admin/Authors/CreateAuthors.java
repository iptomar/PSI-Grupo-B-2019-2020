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
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Criar Autores']")).click();
            Thread.sleep(2000);
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("Ricardo Araujo");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(1000);
            //Confirmação
            String title = driver.getCurrentUrl();
            System.out.println(title);
            Assert.assertEquals(true, title.contains("Authors"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
