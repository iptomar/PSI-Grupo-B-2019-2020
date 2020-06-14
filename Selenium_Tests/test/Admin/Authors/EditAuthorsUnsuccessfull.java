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

/**
 *
 * @author Antonio Rodrigues
 */
public class EditAuthorsUnsuccessfull {
    WebDriver driver;
    
    public EditAuthorsUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void EditedAuthorsUnsuccessfull() {
         try {
            //Ir para Authors
            Thread.sleep(1000);
            driver.findElement(By.xpath("//a[.='Authors']")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Edit']")).click();
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("");
            driver.findElement(By.xpath("//button[.='Submit']")).click();
             //ARRANJAR
            String title = driver.getCurrentUrl();
             if(title.contains("edit")){
                 System.out.println("Autor não editado");
             }else{
                 throw new Exception("Autor editado com sucesso");
             }
          //  WebElement classe = driver.findElement(By.className("alert alert-warning"));
            // Assert.assertEquals(true,title.contains("edit")); 
             
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
