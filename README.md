# Hedera Smart Contract Playground

To configure your dev environment:

 * Create accounts at https://portal.hedera.com/ and https://app.dragonglass.me/hedera/login (if using DragonGlass API)
 * Create a `.env` file at the root of the project with the following variables populated:

```bash
OPERATOR_ACCOUNT_ID=
OPERATOR_PUBLIC_KEY=
OPERATOR_PRIVATE_KEY=

# if alt operator is required (e.g. for token transfer)
ALT_OPERATOR_ACCOUNT_ID=
ALT_OPERATOR_PUBLIC_KEY=
ALT_OPERATOR_PRIVATE_KEY=

# if using DragonGlass API
DRAGON_GLASS_ACCESS_KEY=  
```
