from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

from colorama import Fore, Style, init
init()

# init WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")

# ceka se da se login dugme ucita i klikne
login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
login_btn.click()

#ceka se da se ucita login forma
username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
password_input = driver.find_element(By.ID, "login-pass-input")

username_input.send_keys("klijent2@gmail.com")
password_input.send_keys("123")

#klik na dugme prijave
login_btn = driver.find_element(By.ID, "send-login-req")
login_btn.click()

# ceka se da se ucita pretraga
search_elements = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "headerSearchText")))

# prvi el je datum
search_elements[0].click()


buttons = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'button.rdrDay')))

# trazi dugme sa borojevima datuma
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

#klik na boroj gostiju
search_elements[1].click()

# povecavamo broj gostiju
buttons = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'optionCounterButton')))

# Pretražite dugmad i pronađite ono sa željenim tekstom '+'
for button in buttons:
    button_text = button.text
    if button_text == '+':
        print(f"Dugme sa tekstom + pronađeno")
        button.click()
        break

# pokrece pretragu
search_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'headerBtn')))
search_button.click()
print("Dugme sa klasom 'headerBtn' je kliknuto")

# ucitavaju se rezultati
print("Sada smo na search stranici")
first_option_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'siCheckButton')))
first_option_btn.click()
print("Kliknuto dugme za pregled")

# klik na dugme za rezervacija
reserve_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//button[text()="Reserve or Book Now!"]')))
reserve_button.click()
print("Dugme za rezervaciju je kliknuto")

# klik na dugme za broj gostiju
num_btn = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'css-b62m3t-container')))
num_btn[1].click()
print("Dugme za broj gostiju je kliknuto")

# ceka da se ucita checkbox i klikce prvi checkbox
first_checkbox = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, './/div[contains(@class, "css-1n7v3ny-option")][1]//input[@type="checkbox"]')))
first_checkbox.click()
print("Dodat broj gostiju")

# klik na dugme za slanje zahteva
submit_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'addBtn')))
submit_btn.click()

# ceka da se pojavi poruka
message_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.notification-item')))

# provera teksta poruke
message_text = message_element.text
expected_text = 'Reservation is successfully added!'
if message_text == expected_text:
    print(f"{Fore.GREEN}-------------------------------------------------------------------------")
    print(f"{Fore.GREEN}Poruka se pojavila i tekst je tačan.")
    print(f"{Fore.GREEN}-------------------------------------------------------------------------")
else:
    print("-------------------------------------------------------------------------")
    print(f"Poruka se pojavila, ali tekst nije tačan.")
    print("-------------------------------------------------------------------------")

# Zatvorite WebDriver
driver.quit()
