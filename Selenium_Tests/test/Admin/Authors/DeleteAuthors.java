/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Authors;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Tomás Barros
 */
public class DeleteAuthors {
    WebDriver driver;
    
    public DeleteAuthors(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void DeletedAuthors() {
         try {
            //Ir para Authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Autores']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Delete']")).click();
            Thread.sleep(1000);
            //aceitar alerta
            driver.switchTo().alert().accept();
            Thread.sleep(4000);
             //Verificar se está bem feito
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("Authors"));
            
        }  catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
