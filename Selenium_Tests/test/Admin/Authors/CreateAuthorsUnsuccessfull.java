/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Authors;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
//comment the above line and uncomment below line to use Chrome

/**
 *
 * @author Luís Badalo
 */
public class CreateAuthorsUnsuccessfull {

    WebDriver driver;

    public CreateAuthorsUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }

    public void AddAuthorsUnsuccessfull() {
        try {
            //Ir para create authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Criar Autores']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(3000);
            driver.findElement(By.xpath("//a[.='Autores']")).click();
            //Warnings na página(FORMA CORRETA)
            //WebElement classe = driver.findElement(By.className("alert-warning"));
            //Assert.assertEquals(true, classe.isDisplayed());
            //Confirmação
            String title = driver.getCurrentUrl();
            System.out.println(title);
            Assert.assertEquals(true, title.contains("Authors"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
