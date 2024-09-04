from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from colorama import Fore, Style, init

init()


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")


login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
login_btn.click()


username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
password_input = driver.find_element(By.ID, "login-pass-input")

username_input.send_keys("klijent2@gmail.com")  # Ispravni korisnicki podaci
password_input.send_keys("123")


login_btn = driver.find_element(By.ID, "send-login-req")
login_btn.click()

try:
    #ako preusemeri na stranicu to je dobro
    WebDriverWait(driver, 10).until(
       EC.url_to_be("http://localhost:3000/")
    )
    print(f"{Fore.GREEN}-------------------------------------------------------------------------")
    print(f"{Fore.GREEN}Test uspešan: Uspešno prijavljivanje i preusmeravanje na početnu stranicu.")
    print(f"{Fore.GREEN}-------------------------------------------------------------------------{Style.RESET_ALL}")

except Exception as e:
    print(f"{Fore.RED}-------------------------------------------------------------------------")
    print(f"{Fore.RED}Test neuspešan: Došlo je do greške prilikom prijavljivanja ili preusmeravanja.")
    print(f"Detalj greške: {str(e)}")
    print(f"{Fore.RED}-------------------------------------------------------------------------{Style.RESET_ALL}")


driver.quit()
