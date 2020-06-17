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
 * @author Antonio Rodrigues
 */
public class EditRoteirosUnsuccessfull {

    WebDriver driver;

    public EditRoteirosUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void EditedRoteirosUnsuccessfull() {
        try {
            //Ir para Roteiros
            Thread.sleep(5000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
            Thread.sleep(3000);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            //limpa o texto
            Thread.sleep(2000);
            driver.findElement(By.className("form-control")).clear();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
            Thread.sleep(2000);
            //Warnings na página(FORMA CORRETA)
            //WebElement classe = driver.findElement(By.className("alert-warning"));
            //Assert.assertEquals(true, classe.isDisplayed());
            
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("Routes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
