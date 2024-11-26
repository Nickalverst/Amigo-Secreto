import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

contacts = {
    "Nicolas": "nicolasbarbierisousa@icloud.com",
    "Beatriz": "biagarcia.polly@gmail.com",
    "Bruno": "bruno13judic@gmail.com",
    "Natália": "nataliamotta2010@hotmail.com",
    "Ana Clara": "anaclarabrisola@gmail.com",
    "Vinicius": "vinicius.moscardo@gmail.com",
    "Ingrid": "ingridjunquetti@gmail.com",
    "Daniel": "danielsilvawd877@gmail.com",
    "Augusto": "lehcampos14@gmail.com",
    "Raphael": "raphaelcaliari@hotmail.com",
    "Felipe": "felipe.samaha@hotmail.com"
}

def shuffle_contacts(contacts):
    names = list(contacts.keys())
    emails = list(contacts.values())
    while True:
        random.shuffle(emails)
        if all(contacts[name] != email for name, email in zip(names, emails)):
            break
    return dict(zip(names, emails))

shuffled_contacts = shuffle_contacts(contacts)

sender_email = "nicolasbarbierisousa@gmail.com"
password = "bisbilhoteiro/a você né? olhando minha senha"

smtp_server = "smtp.gmail.com" 
port = 587

try:
    server = smtplib.SMTP(smtp_server, port)
    server.starttls() 
    server.login(sender_email, password)

    for name, email in shuffled_contacts.items():
        subject = f"Seu novo amigo secreto é..."
        body = f"Seu novo amigo secreto é {name}!\n\nAtenciosamente,\n\nCódigo do Nicolas"
        
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        server.sendmail(sender_email, email, msg.as_string())

    server.quit()
    print("All emails sent successfully!")
except Exception as e:
    print(f"An error occurred: {e}")
