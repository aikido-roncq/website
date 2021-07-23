import { formatDate, relativeDateString } from '@/utils/date';

describe(`relativeDateString`, () => {
  it('is just now', () => {
    // Arrange
    const now = new Date();
    // Act
    const result = relativeDateString(now);
    // Assert
    expect(result).toBe(`à l'instant`);
  });

  it('is 1 minute ago', () => {
    // Arrange
    const oneMinuteAgo = new Date();
    oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);
    // Act
    const result = relativeDateString(oneMinuteAgo);
    // Assert
    expect(result).toBe(`il y a 1 minute`);
  });

  it('is 5 minutes ago', () => {
    // Arrange
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    // Act
    const result = relativeDateString(fiveMinutesAgo);
    // Assert
    expect(result).toBe(`il y a 5 minutes`);
  });

  it('is 1 hour ago', () => {
    // Arrange
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    // Act
    const result = relativeDateString(oneHourAgo);
    // Assert
    expect(result).toBe(`il y a 1 heure`);
  });

  it('is 5 hours ago', () => {
    // Arrange
    const fiveHoursAgo = new Date();
    fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);
    // Act
    const result = relativeDateString(fiveHoursAgo);
    // Assert
    expect(result).toBe(`il y a 5 heures`);
  });

  it('is yesterday', () => {
    // Arrange
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // Act
    const result = relativeDateString(yesterday);
    // Assert
    expect(result).toBe(`hier`);
  });

  it('is 6 days ago', () => {
    // Arrange
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    // Act
    const result = relativeDateString(sixDaysAgo);
    // Assert
    expect(result).toBe(`il y a 6 jours`);
  });

  it('is 7 days ago', () => {
    // Arrange
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const formattedDate = formatDate(sevenDaysAgo);
    // Act
    const result = relativeDateString(sevenDaysAgo);
    // Assert
    expect(result).toBe(`le ${formattedDate}`);
  });
});
