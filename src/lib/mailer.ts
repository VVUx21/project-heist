import nodemailer from 'nodemailer';

export const sendEmail = async({email, firstname, lastname, verifyCode}:any) => {
    try {
        
        var transport = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_MAILTRAP_HOST!,
            port: 587,
            auth: {
            user: process.env.NEXT_PUBLIC_MAILTRAP_AUTH!,
            pass: process.env.NEXT_PUBLIC_MAILTRAP_PASS!
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
                <Section>
                <Row>
                    <Heading as="h2">Hello, ${firstname} ${lastname}</Heading>
                </Row>
                <br />
                <Row>
                    <Text>
                    Thank you for registering. Please use the following verification
                    code to complete your registration:
                    </Text>
                </Row>
                <br />
                <Row>
                    <Text>${verifyCode}</Text> 
                </Row>
                <br />
                <Row>
                    <Text>
                    If you did not request this code, please ignore this email.
                    </Text>
                </Row>
                <br />
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