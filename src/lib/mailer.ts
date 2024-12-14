import nodemailer from 'nodemailer';

export const sendEmail = async({email, firstname, lastname, verifyCode}:any) => {
    try {
        
        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
            user: "smtp@mailtrap.io",
            pass: "6e4ce46d9414923986088794fcbfbe85"
            }
        });

        const mailOptions = {
            from: '"Ecell" <noreply@demomailtrap.com>',
            to: email,
            subject:"Verify your email",
            html:`
            <Html lang="en" dir="ltr">
                <Head>
                <title>Verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                    url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                    format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                </Head>
                <Preview>Here&apos;s your verification code: ${verifyCode}</Preview>
                <Section>
                <Row>
                    <Heading as="h2">Hello, ${firstname} ${lastname}</Heading>
                </Row>
                <Row>
                    <Text>
                    Thank you for registering. Please use the following verification
                    code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text> 
                </Row>
                <Row>
                    <Text>
                    If you did not request this code, please ignore this email.
                    </Text>
                </Row>
                <Row>
                    <Text>
                    Best regards,
                    <br />
                    Team Webwiz
                    </Text>
                </Row>
                </Section>
            </Html>
        `
    }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}