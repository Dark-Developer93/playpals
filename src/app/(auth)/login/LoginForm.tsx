import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import formSchema from '@/lib/validationSchemas/loginSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type Props = {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
};

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      rememberMe: false,
    },
  });

  const { watch } = loginForm;
  const usernameOrEmail = watch('usernameOrEmail');
  const password = watch('password');

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        <FormField
          control={loginForm.control}
          name="usernameOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username or Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row-reverse justify-end items-center gap-3">
                <FormLabel className="cursor-pointer">Remember me.</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="viuFull"
          disabled={!usernameOrEmail || !password}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
