from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from colorama import Fore, Style, init

init()
# ako nema nista kada pretrazi izbacuje posle 10 sec poruku da nema

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")


login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
login_btn.click()


username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
password_input = driver.find_element(By.ID, "login-pass-input")

username_input.send_keys("klijent2@gmail.com")
password_input.send_keys("123")


login_btn = driver.find_element(By.ID, "send-login-req")
login_btn.click()


search_elements = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "headerSearchText")))


search_elements[0].click()

buttons = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'button.rdrDay')))


for button in buttons:
    spans = button.find_elements(By.CSS_SELECTOR, 'span.rdrDayNumber span')
    for span in spans:
        if span.text == '10':
            print("Dugme sa tekstom '10' pronađeno")
            button.click()
        elif span.text == '20':
            print("Dugme sa tekstom '20' pronađeno")
            button.click()
            break


search_elements[1].click()


buttons = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'optionCounterButton')))


for button in buttons:
    button_text = button.text
    if button_text == '+':
        print(f"Dugme sa tekstom + pronađeno")
        button.click()
        break


search_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'headerBtn')))
search_button.click()
print("Dugme sa klasom 'headerBtn' je kliknuto")

# Učitavaju se rezultati
print("Sada smo na search stranici")
try:
    first_option_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'siCheckButton')))
    first_option_btn.click()
    print("Kliknuto dugme za pregled")
except:
    print(f"{Fore.GREEN}-------------------------------------------------------------------------")
    print(f"{Fore.GREEN}Nema objekata za izabrane datume.")
    print(f"{Fore.GREEN}-------------------------------------------------------------------------")


driver.quit()