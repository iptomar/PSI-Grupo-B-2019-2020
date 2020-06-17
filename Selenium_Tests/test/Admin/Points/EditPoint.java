/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Points;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Tomás Barros
 */
public class EditPoint {

    WebDriver driver;

    public EditPoint(WebDriver driver) {
        this.driver = driver;
    }

    public void EditedPoints() {
        try {
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(6000);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            Thread.sleep(1000);
            //
           // WebElement name = driver.findElement(By.className("form-control"));
           // name.clear();
           // Thread.sleep(2000);
           // name.sendKeys("AaEdificio2");
            //
           // WebElement location = driver.findElement(By.name("location"));
           // location.clear();
           // Thread.sleep(500);
           // location.sendKeys("Tomar");

           // WebElement dates = driver.findElement(By.name("dates"));
           // dates.clear();
           // Thread.sleep(500);
           // dates.sendKeys("1111");

            WebElement type = driver.findElement(By.name("buildingType"));
            type.clear();
            Thread.sleep(500);
            type.sendKeys("apartamento");

            WebElement des = driver.findElement(By.id("description"));
            des.clear();
            Thread.sleep(500);
            des.sendKeys("apartamento");

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
            //Mudar foto
            foto.sendKeys("C:\\Users\\LuisBadalo\\Desktop\\Screenshot_1.png");
            WebElement autor = driver.findElement(By.name("source_author"));
            Thread.sleep(500);
            autor.sendKeys("Aasas");
            WebElement desc = driver.findElement(By.name("description_images"));
            Thread.sleep(500);
            desc.sendKeys("Aasda");

            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Add image']")).click();

            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
             Thread.sleep(5000);
            //WebElement Autores = driver.findElement(By.id("react-select-2-input"));
            //Autores.sendKeys("aa");
            //Thread.sleep(5000);
            //Autores.sendKeys(Keys.RETURN);

            //Thread.sleep(500);
            //driver.findElement(By.xpath("//button[.='Delete']")).click();
            //Thread.sleep(1000);

            //driver.switchTo().alert().accept();

            //Apagar coordenadas            
            driver.findElement(By.xpath("/html/body/div[1]/div/form/div[14]/table/tbody/tr[1]/td[4]/button")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("/html/body/div[1]/div/form/div[14]/table/tbody/tr[1]/td[4]/button")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("/html/body/div[1]/div/form/div[14]/table/tbody/tr[1]/td[4]/button")).click();
            
            //driver.findElement(By.xpath("//button[.='Delete']")).click();
            //driver.findElement(By.xpath("//button[.='Delete']")).click();

            WebElement c1 = driver.findElement(By.name("coordenada1"));
            Thread.sleep(500);
            c1.sendKeys("1");

            WebElement c2 = driver.findElement(By.name("coordenada2"));
            Thread.sleep(500);
            c2.sendKeys("2");

            WebElement or = driver.findElement(By.name("order"));
            Thread.sleep(500);
            or.sendKeys("1");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();

            Thread.sleep(500);
            c1.sendKeys("1");
            Thread.sleep(500);
            c2.sendKeys("2");
            Thread.sleep(500);
            or.sendKeys("2");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(500);
            c1.sendKeys("1");
            Thread.sleep(500);
            c2.sendKeys("2");
            Thread.sleep(500);
            or.sendKeys("3");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(5000);
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("PointsOfInterest"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
