import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entity/ChannelChats';      // 상대경로로 해준다.
import { ChannelMembers } from './src/entity/ChannelMembers';  // 상대경로로 해준다.
import { Channels } from './src/entity/Channels';  // 상대경로로 해준다.
import { DMs } from './src/entity/DMs';  // 상대경로로 해준다.
import { Mentions } from './src/entity/Mentions';  // 상대경로로 해준다.
import { Users } from './src/entity/Users';  // 상대경로로 해준다.
import { WorkspaceMembers } from './src/entity/WorkspaceMembers';  // 상대경로로 해준다.
import { Workspaces } from './src/entity/Workspaces';  // 상대경로로 해준다.

// ConfigModule을 사용할 수 없기때문에 dotenv를 사용한다. ConfigModule은 내부적으로 dotenv를 사용한다.
dotenv.config();

// typeorm-extension은 app.module.ts 설정을 못 읽어온다. 따라서 dataSource.ts 파일을 생성했다.


const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT,10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'], // src/migrations 폴더에 있는 파일을 마이그레이션으로 인식한다.
  synchronize: false,
  logging: true,
});

export default dataSource;