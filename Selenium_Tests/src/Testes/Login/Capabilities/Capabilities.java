/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Testes.Login.Capabilities;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 *
 * @author Luís Badalo
 */
public class Capabilities {

    private WebDriver driver;

    public Capabilities() {
        // declaration and instantiation of objects/variables
        System.setProperty("webdriver.gecko.driver", "FilesForProject\\selenium-java-3.141.59\\geckodriver.exe");
        this.driver = new FirefoxDriver();

        //comment the above 2 lines and uncomment below 2 lines to use Chrome
        //System.setProperty("webdriver.chrome.driver","FilesForProject\\selenium-java-3.141.59\\chromedriver.exe");
        //WebDriver driver = new ChromeDriver();
    }

    public WebDriver getDriver() {
        String baseUrl = "http://front.psi2020.tugamars.com";
        String expectedTitle = "React App";
        String actualTitle = "";

        // launch Fire fox and direct it to the Base URL
        driver.get(baseUrl);
        return driver;
    }
}
