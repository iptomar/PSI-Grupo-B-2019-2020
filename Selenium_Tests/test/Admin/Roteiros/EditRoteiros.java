/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Tomás Barros
 */
public class EditRoteiros {

    WebDriver driver;

    public EditRoteiros(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void EditedRoteiros() {
        try {
            //Ir para Roteiros
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            WebElement autor = driver.findElement(By.className("form-control"));
            //limpa o texto
            Thread.sleep(2000);
            driver.findElement(By.className("form-control")).clear();
            autor.sendKeys("AaRotass");
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(5000);
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("Routes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
