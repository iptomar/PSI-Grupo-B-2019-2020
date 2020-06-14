/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Users;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Tomás Barros
 */
public class ListUsers {
    WebDriver driver;
    
    public ListUsers(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void ListedUsers() {
         try {
            //Ir para Authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Users']")).click();
            //ARRANJAR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("users"));
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
