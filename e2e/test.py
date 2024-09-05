import time
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from colorama import Fore, Style, init

init()

class BookingTests(unittest.TestCase):

    def setUp(cls):
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        cls.driver.get("http://localhost:3000/")

    def tearDown(cls):
        cls.driver.quit()

    def test_successful_login(self):
        driver = self.driver

        login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
        login_btn.click()

        username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
        password_input = driver.find_element(By.ID, "login-pass-input")

        username_input.send_keys("klijent2@gmail.com")  # Ispravni korisnicki podaci
        password_input.send_keys("123")

        login_btn = driver.find_element(By.ID, "send-login-req")
        login_btn.click()

        WebDriverWait(driver, 10).until(EC.url_to_be("http://localhost:3000/"))
        self.assertEqual(driver.current_url, "http://localhost:3000/", "Failed to redirect to the home page.")



    def test_unsuccessful_login(self):
        driver = self.driver
        login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
        login_btn.click()

        username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
        password_input = driver.find_element(By.ID, "login-pass-input")

        username_input.send_keys("gresxska@gmail.com")
        password_input.send_keys("123")

        login_btn = driver.find_element(By.ID, "send-login-req")
        login_btn.click()


        error_message_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.wrong')))
        error_message_text = error_message_element.text
        expected_error_text = 'The email or password is incorrect'

        self.assertEqual(error_message_text, expected_error_text, "The email or password is incorrect")

    def test_registration_success(self):
        driver = self.driver
        login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "reg-button")))
        login_btn.click()


        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "form")))

        email_input = driver.find_element(By.ID, "1")
        email_input.send_keys("tesfst22@test.com")

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

        message_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.notification-item')))

        # provera teksta poruke
        message_text = message_element.text
        expected_text = 'Please check your email and confirm registration!'
        self.assertEqual(message_text, expected_text, "Failed to redirect to the home page.")

    def test_no_properties_available_for_dates(self):
        driver = self.driver
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
                for i in range(15):
                    button.click()
                break

        search_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'headerBtn')))
        search_button.click()
        print("Dugme sa klasom 'headerBtn' je kliknuto")

        # Učitavaju se rezultati
        print("Sada smo na search stranici")
        try:
            first_option_btn = WebDriverWait(driver, 4).until(EC.element_to_be_clickable((By.CLASS_NAME, 'siCheckButton')))
            self.fail("Dugme sa klasom 'siCheckButton' je pronađeno, a očekivalo se da ne bude prisutno.")
        except:
            pass


    def test_successful_end_to_end_flow(self):
        driver = self.driver

        # ceka se da se login dugme ucita i klikne
        login_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "login-button")))
        login_btn.click()

        # ceka se da se ucita login forma
        username_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-name-input")))
        password_input = driver.find_element(By.ID, "login-pass-input")

        username_input.send_keys("klijent2@gmail.com")
        password_input.send_keys("123")

        # klik na dugme prijave
        login_btn = driver.find_element(By.ID, "send-login-req")
        login_btn.click()

        # ceka se da se ucita pretraga
        search_elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "headerSearchText")))

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

        # klik na boroj gostiju
        search_elements[1].click()

        # povecavamo broj gostiju
        buttons = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'optionCounterButton')))

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
        reserve_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[text()="Reserve or Book Now!"]')))
        reserve_button.click()
        print("Dugme za rezervaciju je kliknuto")

        # klik na dugme za broj gostiju
        num_btn = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'css-b62m3t-container')))
        num_btn[1].click()
        print("Dugme za broj gostiju je kliknuto")

        # ceka da se ucita checkbox i klikce prvi checkbox
        first_checkbox = WebDriverWait(driver, 10).until(EC.element_to_be_clickable(
            (By.XPATH, './/div[contains(@class, "css-1n7v3ny-option")][1]//input[@type="checkbox"]')))
        first_checkbox.click()
        print("Dodat broj gostiju")

        # klik na dugme za slanje zahteva
        submit_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'addBtn')))
        submit_btn.click()

        # ceka da se pojavi poruka
        message_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.notification-item')))

        # provera teksta poruke
        message_text = message_element.text
        expected_text = 'Reservation is successfully added!'
        self.assertEqual(message_text, expected_text, "faild to send request")

if __name__ == "__main__":
   unittest.main()