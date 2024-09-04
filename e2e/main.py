import time
from telnetlib import EC

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import wait
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")
time.sleep(10)
#prov najdemo login button i kliknemo
login_btn = driver.find_element(By.ID, "login-button")
login_btn.click()
#sada smo na login formi
#nadjemo elemente za username i pass i zatim ih popunimo i kliknemo submit dugme
username_input = driver.find_element(By.ID, "login-name-input")
password_input = driver.find_element(By.ID, "login-pass-input")
username_input.send_keys("klijent2@gmail.com")
password_input.send_keys("123")

login_btn = driver.find_element(By.ID, "send-login-req")
login_btn.click()
time.sleep(5)

#sada pretrazimimo vikendice u nekom datumu kako bi nam izbacio sve u tom periodu za taj broj gostiju

search_elements = driver.find_elements(By.CLASS_NAME, "headerSearchText")
#prvi element je datum a drugi broj gostiju

search_elements[0].click()

time.sleep(10)
buttons = driver.find_elements(By.CSS_SELECTOR, 'button.rdrDay')

# Pretražite dugmad i pronađite ono koje odgovaraju datumimat
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

#klik na broj gostiju da povecamo na 3
search_elements[1].click()
time.sleep(4)
buttons = driver.find_elements(By.CLASS_NAME, 'optionCounterButton')

# Pretražite dugmad i pronađite ono sa željenim tekstom
for button in buttons:
    button_text = button.text
    if button_text == '+':
        print(f"Dugme sa tekstom + pronađeno")
        button.click()
        break

time.sleep(2)
search_button = driver.find_element(By.CLASS_NAME, 'headerBtn')

search_button.click()
print("Dugme sa klasom 'headerBtn' je kliknuto")

###############################################################################
print("Sada smo na search stranici")
time.sleep(2)
#udjemo na prvu ponudu
first_option_btn = driver.find_element(By.CLASS_NAME, 'siCheckButton')
first_option_btn.click()
print("Kliknuto dugme za pregled")
time.sleep(3)
reserve_button = driver.find_element(By.XPATH, '//button[text()="Reserve or Book Now!"]')
reserve_button.click()
print("Dugme sa za rezervaciju je kliknuto")
time.sleep(2)  #drugo dugme ove klase provo je ako zelimo dodaten servise
num_btn = driver.find_elements(By.CLASS_NAME, 'css-b62m3t-container')
num_btn[1].click()
print("Dugme za br gostiju je kliknuto")

time.sleep(3)
# dropdown =  (By.CLASS_NAME, 'react-select-21__control')
#
# dropdown.click()
#obelezen broj gostiju
first_checkbox = driver.find_element(By.XPATH, './/div[contains(@class, "css-1n7v3ny-option")][1]//input[@type="checkbox"]')
first_checkbox.click()
print("Dodat broj gostiju")



#slanje zahteva
submit_btn = driver.find_element(By.CLASS_NAME, 'addBtn')
submit_btn.click()




time.sleep(60)
driver.quit()



