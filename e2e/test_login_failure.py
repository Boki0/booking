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

username_input.send_keys("greska@gmail.com")
password_input.send_keys("123")


login_btn = driver.find_element(By.ID, "send-login-req")
login_btn.click()


try:

    error_message_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '.wrong'))
    )
    error_message_text = error_message_element.text
    expected_error_text = 'The email or password is incorrect'

    if error_message_text == expected_error_text:
        print(f"{Fore.GREEN}-------------------------------------------------------------------------")
        print(f"{Fore.GREEN}Test uspešan: Prikazana je očekivana poruka o grešci.")
        print(f"{Fore.GREEN}------------------------------------------------------------------------")
    else:
        print("-------------------------------------------------------------------------")
        print(f"Test neuspešan: Prikazana poruka o grešci nije očekivana. Pronađeni tekst: '{error_message_text}'")
        print("-------------------------------------------------------------------------")
except:
    print("-------------------------------------------------------------------------")
    print("Test neuspešan: Poruka o grešci nije pronađena.")
    print("-------------------------------------------------------------------------")


driver.quit()