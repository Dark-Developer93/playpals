import * as React from 'react';

import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';

interface ResetPasswordEmailTemplateProps {
  email: string;
  resetPasswordToken: string;
  firstName: string;
}

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const link = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#fff',
  background: '#001429',
  padding: '0.5rem 1.5rem',
  borderRadius: '4rem',
  textAlign: 'center',
  textDecoration: 'none',
};

export const ResetPassword = ({
  email,
  resetPasswordToken,
  firstName,
}: ResetPasswordEmailTemplateProps) => (
  <Html>
    <Section style={main}>
      <Container style={container}>
        <Text>
          Hi {firstName}, You recently requested to reset the password for your
          <b> {email}</b> account. Click the button below to proceed.
        </Text>

        <a
          style={link as React.CSSProperties}
          href={`http://localhost:3000/reset-password?token=${resetPasswordToken}`}
        >
          Reset password
        </a>
        <Text>
          If you did not request a password reset, please ignore this email or
          reply to let us know. This password reset link is only valid for the
          next 24 hours.
        </Text>
        <Text>Thanks,</Text>
        <Text>The Support team</Text>
      </Container>
    </Section>
  </Html>
);
