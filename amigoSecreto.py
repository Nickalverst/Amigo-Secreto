import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

contacts = {
    "Foo": "foo@zhu.com",
    "Bar": "bar@xyz.com",
    "Bob": "bob@llm.com"
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

sender_email = "sender@provider.com"
password = "pass"

smtp_server = "smtp.provider.com"
port = 587

try:
    server = smtplib.SMTP(smtp_server, port)
    server.starttls() 
    server.login(sender_email, password)

    for name, email in shuffled_contacts.items():
        subject = f"Seu amigo secreto é..."
        body = f"Seu amigo secreto é {name}!\n\nAtenciosamente,\n\nCódigo do Remetente"
        
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
