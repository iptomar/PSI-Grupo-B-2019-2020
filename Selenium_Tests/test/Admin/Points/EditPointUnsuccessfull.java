/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Points;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Antonio Rodrigues
 */
public class EditPointUnsuccessfull {
     WebDriver driver;
    
    public EditPointUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }
    
    public void EditPointsUnsuccessfull() {
        try {
            Thread.sleep(1000);
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            WebElement name = driver.findElement(By.name("buildingName"));
            name.clear();
            Thread.sleep(500);
            name.sendKeys("");
            WebElement location = driver.findElement(By.name("location"));
            location.clear();
            Thread.sleep(500);
            location.sendKeys("");
            WebElement dates = driver.findElement(By.name("dates"));
            dates.clear();
            Thread.sleep(500);
            dates.sendKeys("");
            WebElement type = driver.findElement(By.name("buildingType"));
            type.clear();
            Thread.sleep(500);
            type.sendKeys("");
            WebElement des = driver.findElement(By.id("description"));
            des.clear();
            Thread.sleep(500);
            des.sendKeys("");
            WebElement coor1 = driver.findElement(By.name("coordinate1"));
            coor1.clear();
            Thread.sleep(500);
            coor1.sendKeys("1");
            WebElement coor2 = driver.findElement(By.name("coordinate2"));
            coor2.clear();
            Thread.sleep(500);
            coor2.sendKeys("2");
            WebElement foto = driver.findElement(By.className("custom-file-input"));
            Thread.sleep(500);
            foto.sendKeys("C:\\Users\\Tiago jugojugopt\\Pictures\\Saved Pictures\\casa.jpg");
            WebElement autor = driver.findElement(By.name("source_author"));
            Thread.sleep(500);
            autor.sendKeys("");
            WebElement desc = driver.findElement(By.name("description_images"));
            Thread.sleep(500);
            desc.sendKeys("");
            
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Add image']")).click();
            
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            
            Thread.sleep(5000);
            WebElement teste = driver.findElement(By.id("react-select-2-input"));
            teste.sendKeys("aa");
            
            Thread.sleep(5000);
            teste.sendKeys(Keys.RETURN);
            
            
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Delete']")).click();
            
            
            driver.switchTo().alert().accept();
            
            WebElement c1 = driver.findElement(By.name("coordenada1"));
            Thread.sleep(500);
            c1.sendKeys("1");
            
            WebElement c2 = driver.findElement(By.name("coordenada2"));
            Thread.sleep(500);
            c2.sendKeys("2");
            
            WebElement or = driver.findElement(By.name("order"));
            Thread.sleep(500);
            or.sendKeys("1");
            
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            
            
            c1.sendKeys("1");
            
            c2.sendKeys("2");
            
            or.sendKeys("2");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            c1.sendKeys("1");
            
            c2.sendKeys("2");
            
            or.sendKeys("3");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            
            
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Delete']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Delete']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Delete']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(500);
              //Confirmacao ULR
            String title = driver.getCurrentUrl();
           if(title.contains("edit")){
                 System.out.println("Ponto não editado");
             }else{
                 throw new Exception("Ponto editado com sucesso");
             }
        } catch (Exception ex) {
            Logger.getLogger(EditPoint.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
