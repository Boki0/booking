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


login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "reg-button")))
login_btn.click()


try:

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "form")))


    email_input = driver.find_element(By.ID, "1")
    email_input.send_keys("test2@test.com")

    first_name_input = driver.find_element(By.ID, "2")
    first_name_input.send_keys("test")

    last_name_input = driver.find_element(By.ID, "3")
    last_name_input.send_keys("test")

    password_input = driver.find_element(By.ID, "4")
    password_input.send_keys("testtest12")

    confirm_password_input = driver.find_element(By.ID, "5")
    confirm_password_input.send_keys("testtest12")

    country_input = driver.find_element(By.ID, "6")
    country_input.send_keys("test")

    city_input = driver.find_element(By.ID, "7")
    city_input.send_keys("test")

    street_input = driver.find_element(By.ID, "8")
    street_input.send_keys("test")

    phone_number_input = driver.find_element(By.ID, "9")
    phone_number_input.send_keys("1234567890")

    submit_button = driver.find_element(By.CSS_SELECTOR, "button.submit")
    submit_button.click()



    message_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.notification-item')))

    # provera teksta poruke
    message_text = message_element.text
    expected_text = 'Please check your email and confirm registration!'
    if message_text == expected_text:
        print(f"{Fore.GREEN}-------------------------------------------------------------------------")
        print(f"{Fore.GREEN}Poruka se pojavila i tekst je tačan.")
        print(f"{Fore.GREEN}-------------------------------------------------------------------------")
    else:
        print("-------------------------------------------------------------------------")
        print(f"Poruka se pojavila, ali tekst nije tačan.")
        print("-------------------------------------------------------------------------")

except Exception as e:
    print(f"Došlo je do greške: {e}")