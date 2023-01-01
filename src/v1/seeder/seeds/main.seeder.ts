import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BocalsSeeder } from './bocals.seeder';
import { CadetsSeeder } from './cadets.seeder';
import { CategoriesSeeder } from './categories.seeder';
import { CommentsSeeder } from './comments.seeder';
import { KeywordCategoriesSeeder } from './keywordCategories.seeder';
import { KeywordsSeeder } from './keywords.seeder';
import { MentorKeywordsSeeder } from './mentor-keywords.seeder';
import { MentoringLogsSeeder } from './mentoring-logs.seeder';
import { MentorsSeeder } from './mentors.seeder';
import { ReportsSeeder } from './reports.seeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await runSeeder(dataSource, BocalsSeeder);
    // await runSeeder(dataSource, CadetsSeeder);
    // await runSeeder(dataSource, KeywordsSeeder);
    // await runSeeder(dataSource, CategoriesSeeder);
    // await runSeeder(dataSource, KeywordCategoriesSeeder);
    await runSeeder(dataSource, MentorsSeeder);
    await runSeeder(dataSource, MentorKeywordsSeeder);
    // await runSeeder(dataSource, CommentsSeeder);
    // await runSeeder(dataSource, MentoringLogsSeeder);
    // await runSeeder(dataSource, ReportsSeeder);
  }
}
